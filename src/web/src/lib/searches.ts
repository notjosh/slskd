import api from './api';
import {
  type ApiResponsesDetailData,
  type ApiSearchesCreateData,
  type ApiSearchesDeleteData,
  type ApiSearchesDetailData,
  type ApiSearchesListData,
  type ApiSearchesUpdateData,
  type ApiSlskdSearchFile,
  type ApiSlskdSearchResponse,
  type ApiSlskdSearchSearch,
} from './generated/types';

export const getAll = async () => {
  return (await api.get<ApiSearchesListData>('/searches')).data;
};

export const stop = async ({ id }: { id: string }) => {
  return await api.put<ApiSearchesUpdateData>(
    `/searches/${encodeURIComponent(id)}`,
  );
};

export const remove = async ({ id }: { id: string }) => {
  return await api.delete<ApiSearchesDeleteData>(
    `/searches/${encodeURIComponent(id)}`,
  );
};

export const create = async ({
  id,
  searchText,
}: {
  id: string;
  searchText: string;
}) => await api.post<ApiSearchesCreateData>('/searches', { id, searchText });

export const getStatus = async ({
  id,
  includeResponses = false,
}: {
  id: string;
  includeResponses: boolean;
}) =>
  (
    await api.get<ApiSearchesDetailData>(
      `/searches/${encodeURIComponent(id)}?includeResponses=${includeResponses}`,
    )
  ).data;

export const getResponses = async ({ id }: Pick<ApiSlskdSearchSearch, 'id'>) =>
  (
    await api.get<ApiResponsesDetailData>(
      `/searches/${encodeURIComponent(id)}/responses`,
    )
  ).data;

const getNthMatch = (string: string, regex: RegExp, n: number) => {
  const match = string.match(regex);
  const nth = match?.[n];

  if (nth != null) {
    return Number.parseInt(nth, 10);
  }

  return undefined;
};

type SearchFilterFile = Pick<
  ApiSlskdSearchFile,
  | 'bitRate'
  | 'size'
  | 'length'
  | 'filename'
  | 'sampleRate'
  | 'bitDepth'
  | 'isVariableBitRate'
>;

type SearchFilters = {
  exclude: string[];
  include: string[];
  isCBR: boolean;
  isLossless: boolean;
  isLossy: boolean;
  isVBR: boolean;
  minBitDepth: number;
  minBitRate: number;
  minFileSize: number;
  minFilesInFolder: number;
  minLength: number;
};

const defaultFilters: SearchFilters = {
  exclude: [],
  include: [],
  isCBR: false,
  isLossless: false,
  isLossy: false,
  isVBR: false,
  minBitDepth: 0,
  minBitRate: 0,
  minFilesInFolder: 0,
  minFileSize: 0,
  minLength: 0,
};

export const parseFiltersFromString = (string: string): SearchFilters => {
  const filters = {
    exclude: [] as string[],
    include: [] as string[],
    isCBR: false,
    isLossless: false,
    isLossy: false,
    isVBR: false,
    minBitDepth: 0,
    minBitRate: 0,
    minFilesInFolder: 0,
    minFileSize: 0,
    minLength: 0,
  };

  filters.minBitRate =
    getNthMatch(string, /(minbr|minbitrate):(\d+)/iu, 2) ?? filters.minBitRate;
  filters.minBitDepth =
    getNthMatch(string, /(minbd|minbitdepth):(\d+)/iu, 2) ??
    filters.minBitDepth;
  filters.minFileSize =
    getNthMatch(string, /(minfs|minfilesize):(\d+)/iu, 2) ??
    filters.minFileSize;
  filters.minLength =
    getNthMatch(string, /(minlen|minlength):(\d+)/iu, 2) ?? filters.minLength;
  filters.minFilesInFolder =
    getNthMatch(string, /(minfif|minfilesinfolder):(\d+)/iu, 2) ??
    filters.minFilesInFolder;

  filters.isVBR = Boolean(/isvbr/iu.test(string));
  filters.isCBR = Boolean(/iscbr/iu.test(string));
  filters.isLossless = Boolean(/islossless/iu.test(string));
  filters.isLossy = Boolean(/islossy/iu.test(string));

  const terms = string
    .toLowerCase()
    .split(' ')
    .filter(
      (term) =>
        !term.includes(':') &&
        term !== 'isvbr' &&
        term !== 'iscbr' &&
        term !== 'islossless' &&
        term !== 'islossy',
    );

  filters.include = terms.filter((term) => !term.startsWith('-'));
  filters.exclude = terms
    .filter((term) => term.startsWith('-'))
    .map((term) => term.slice(1));

  return filters;
};

export const filterResponse = <
  TResponse extends Partial<
    Pick<ApiSlskdSearchResponse, 'fileCount' | 'lockedFileCount'> & {
      files: SearchFilterFile[];
      lockedFiles: SearchFilterFile[];
    }
  >,
>({
  filters: filtersInput,
  response,
}: {
  filters: Partial<SearchFilters>;
  response: TResponse;
}): TResponse => {
  const {
    files = [],
    lockedFiles = [],
    fileCount = 0,
    lockedFileCount = 0,
  } = response;

  const filters = { ...defaultFilters, ...filtersInput };

  if (fileCount + lockedFileCount < filters.minFilesInFolder) {
    return { ...response, files: [] };
  }

  const filterFiles = (filesToFilter: SearchFilterFile[]) =>
    // eslint-disable-next-line complexity
    filesToFilter.filter((file) => {
      const {
        bitRate,
        size,
        length,
        filename,
        sampleRate,
        bitDepth,
        isVariableBitRate,
      } = file;
      const {
        isCBR,
        isVBR,
        isLossless,
        isLossy,
        minBitRate,
        minBitDepth,
        minFileSize,
        minLength,
        include = [],
        exclude = [],
      } = filters;

      if (isCBR && (isVariableBitRate === undefined || isVariableBitRate))
        return false;
      if (isVBR && (isVariableBitRate === undefined || !isVariableBitRate))
        return false;
      if (isLossless && (!sampleRate || !bitDepth)) return false;
      if (isLossy && (sampleRate || bitDepth)) return false;
      if (bitRate && bitRate < minBitRate) return false;
      if (bitDepth && bitDepth < minBitDepth) return false;
      if (size < minFileSize) return false;
      if (length && length < minLength) return false;

      if (
        include.length > 0 &&
        include.filter((term) => filename.toLowerCase().includes(term))
          .length !== include.length
      ) {
        return false;
      }

      if (exclude.some((term) => filename.toLowerCase().includes(term)))
        return false;

      return true;
    });

  const filteredFiles = filterFiles(files);
  const filteredLockedFiles = filterFiles(lockedFiles);

  return {
    ...response,
    fileCount: filteredFiles.length,
    files: filteredFiles,
    lockedFileCount: filteredLockedFiles.length,
    lockedFiles: filteredLockedFiles,
  };
};

import { FlaggedEnum } from './flags';

enum ExampleEnum {
  Cancelled = 'Cancelled',
  Errored = 'Errored',
  None = 'None',
  Requested = 'Requested',
}

describe('FlaggedEnum', () => {
  describe('single', () => {
    it('has', () => {
      const flags = new FlaggedEnum<ExampleEnum>(ExampleEnum.Cancelled);

      expect(flags.has(ExampleEnum.Cancelled)).toBe(true);
      expect(flags.has([ExampleEnum.Cancelled])).toBe(true);
      expect(flags.has(ExampleEnum.Requested)).toBe(false);
      expect(flags.has([ExampleEnum.Cancelled, ExampleEnum.Requested])).toBe(
        false,
      );
    });

    it('isExactly', () => {
      const flags = new FlaggedEnum<ExampleEnum>(ExampleEnum.Cancelled);

      expect(flags.isExactly(ExampleEnum.Cancelled)).toBe(true);
      expect(flags.has([ExampleEnum.Cancelled])).toBe(true);
      expect(flags.isExactly(ExampleEnum.Requested)).toBe(false);
      expect(flags.has([ExampleEnum.Cancelled, ExampleEnum.Requested])).toBe(
        false,
      );
    });
  });

  describe('array (length 2)', () => {
    it('has', () => {
      const flags = new FlaggedEnum<ExampleEnum>('Cancelled, Errored');

      expect(flags.has(ExampleEnum.Cancelled)).toBe(true);
      expect(flags.has([ExampleEnum.Cancelled])).toBe(true);
      expect(flags.has([ExampleEnum.Cancelled, ExampleEnum.Errored])).toBe(
        true,
      );
      expect(flags.has(ExampleEnum.Requested)).toBe(false);
      expect(flags.has([ExampleEnum.Requested, ExampleEnum.Cancelled])).toBe(
        false,
      );
    });

    it('isExactly', () => {
      const flags = new FlaggedEnum<ExampleEnum>('Cancelled, Errored');

      expect(flags.isExactly(ExampleEnum.Cancelled)).toBe(false);
      expect(
        flags.isExactly([ExampleEnum.Cancelled, ExampleEnum.Errored]),
      ).toBe(true);
      expect(flags.isExactly(ExampleEnum.Requested)).toBe(false);
      expect(
        flags.isExactly([ExampleEnum.Requested, ExampleEnum.Cancelled]),
      ).toBe(false);
    });
  });

  describe('array (length 3)', () => {
    it('has', () => {
      const flags = new FlaggedEnum<ExampleEnum>(
        'Cancelled, Errored, Requested',
      );

      expect(flags.has(ExampleEnum.Cancelled)).toBe(true);
      expect(flags.has([ExampleEnum.Cancelled])).toBe(true);
      expect(flags.has([ExampleEnum.Cancelled, ExampleEnum.Errored])).toBe(
        true,
      );
      expect(flags.has(ExampleEnum.None)).toBe(false);
      expect(flags.has([ExampleEnum.None, ExampleEnum.Cancelled])).toBe(false);
    });

    it('isExactly', () => {
      const flags = new FlaggedEnum<ExampleEnum>(
        'Cancelled, Errored, Requested',
      );

      expect(
        flags.isExactly([
          ExampleEnum.Cancelled,
          ExampleEnum.Errored,
          ExampleEnum.Requested,
        ]),
      ).toBe(true);

      expect(flags.isExactly(ExampleEnum.Cancelled)).toBe(false);
      expect(flags.isExactly(ExampleEnum.Requested)).toBe(false);
      expect(
        flags.isExactly([ExampleEnum.Requested, ExampleEnum.Cancelled]),
      ).toBe(false);
    });
  });
});

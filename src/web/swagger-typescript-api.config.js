/* eslint-disable canonical/filename-match-exported */
// npx swagger-typescript-api -p http://localhost:5030/swagger/v0/swagger.json -o ./src/lib/generated/ -n types.ts --type-prefix Api --patch --sort-types --extract-enums --responses --add-readonly --route-types --no-client --extract-response-body --add-readonly --custom-config ./swagger-typescript-api.config.js

/** @type {import('swagger-typescript-api').GenerateApiParams} */
const config = {
  codeGenConstructs: (struct) => {
    return {
      ...struct,
      Keyword: {
        ...struct.Keyword,
        Any: 'unknown',
      },
    };
  },
  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      // console.log('onFormatRouteName', routeInfo, { templateRouteName });

      // TODO: find a way to generate nicer names, so we don't end up with 'someRoute2', 'someRoute3', etc.
      // if (!routeInfo.operationId) {
      //   return generateOperationId(routeInfo);
      // }

      return templateRouteName;
    },
  },
};

module.exports = config;

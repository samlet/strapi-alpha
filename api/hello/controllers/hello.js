'use strict';

/**
 * A set of functions called "actions" for `hello`
 * Invoke:
 *  http://localhost:1337/hello
 *  http://localhost:1337/hello/find
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  // GET /hello
  index: async ctx => {
    return 'Hello World!';
  },
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }

  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.restaurant.search(ctx.query);
    } else {
      entities = await strapi.services.restaurant.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.restaurant }));
  },
};

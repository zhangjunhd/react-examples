'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.pluralIdentifyingRootField = pluralIdentifyingRootField;

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pluralIdentifyingRootField(config) {
  var inputArgs = {};
  inputArgs[config.argName] = {
    type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(new _graphql.GraphQLNonNull(config.inputType)))
  };
  return {
    description: config.description,
    type: new _graphql.GraphQLList(config.outputType),
    args: inputArgs,
    resolve: function resolve(obj, args, context, info) {
      var inputs = args[config.argName];
      return _promise2.default.all(inputs.map(function (input) {
        return _promise2.default.resolve(config.resolveSingleInput(input, context, info));
      }));
    }
  };
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
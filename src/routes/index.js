import { Router } from 'express'
import { Types } from 'mongoose'

import getMongooseErrors from '../misc/getMongooseErrors'
import makeSanitizeRanking from './ranking/make-sanitize'
import makeGetRankingDuplicateError from './ranking/make-getDuplicateError'
import getRankingConsistencyError from './ranking/getConsistencyError'

import makeStyle from './style/make-index'
import makeCreateStyle from './style/make-createStyle'
import makeGetStyle from './style/make-getStyle'
import makeUpdateStyle from './style/make-updateStyle'
import makeDeleteStyle from './style/make-deleteStyle'

import makeRanking from './ranking/make-index'
import makeCreateRanking from './ranking/make-createRanking'
import makeGetRanking from './ranking/make-getRanking'
import makeUpdateRanking from './ranking/make-updateRanking'
import makeDeleteRanking from './ranking/make-deleteRanking'

const ObjectId = Types.ObjectId
const createStyle = makeCreateStyle({ getMongooseErrors, Style })
const getStyle = makeGetStyle({ getMongooseErrors, Style })
const updateStyle = makeUpdateStyle({ getMongooseErrors, Style })
const deleteStyle = makeDeleteStyle({ getMongooseErrors, Style })

const sanitizeRanking = makeSanitizeRanking({ ObjectId })
const getRankingDuplicateError = makeGetRankingDuplicateError({ Ranking })
const createRanking = makeCreateRanking({
  getMongooseErrors,
  Ranking,
  sanitize: sanitizeRanking,
  getDuplicateError: getRankingDuplicateError,
  getConsistencyError: getRankingConsistencyError
})
const getRanking = makeGetRanking({ getMongooseErrors, Ranking })
const updateRanking = makeUpdateRanking({
  getMongooseErrors,
  Ranking,
  sanitize: sanitizeRanking,
  getDuplicateError: getRankingDuplicateError,
  getConsistencyError: getRankingConsistencyError
})
const deleteRanking = makeDeleteRanking({ getMongooseErrors, Ranking })

module.exports.setRoutes = (app) => {
  app
  .use('/styles', makeStyle({
    Router, createStyle, getStyle, updateStyle, deleteStyle
  }))
  .use('/rankings', makeRanking({
    Router, createRanking, getRanking, updateRanking, deleteRanking
  }))
};

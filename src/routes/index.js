import { Router } from 'express'
import { Types } from 'mongoose'

import getMongooseErrors from '../misc/getMongooseErrors'
import { Style, Ranking, Tattooer } from '../models'

import makeSanitizeRanking from './ranking/make-sanitize'
import makeGetRankingDuplicateError from './ranking/make-getDuplicateError'
import getRankingConsistencyError from './ranking/getConsistencyError'

import makeSanitizeTattooer from './tattooer/make-sanitize'
import makeGetTattooerDuplicateError from './tattooer/make-getDuplicateError'
import getTattooerConsistencyError from './tattooer/getConsistencyError'

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

import makeTattooer from './tattooer/make-index'
import makeCreateTattooer from './tattooer/make-createTattooer'
import makeGetTattooer from './tattooer/make-getTattooer'
import makeUpdateTattooer from './tattooer/make-updateTattooer'
import makeDeleteTattooer from './tattooer/make-deleteTattooer'
import makeFindTattooers from './tattooer/make-findTattooer'

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

const sanitizeTattooer = makeSanitizeTattooer({ ObjectId })
const getTattooerDuplicateError = makeGetTattooerDuplicateError({ Tattooer })
const createTattooer = makeCreateTattooer({
  getMongooseErrors,
  Tattooer,
  sanitize: sanitizeTattooer,
  getDuplicateError: getTattooerDuplicateError,
  getConsistencyError: getTattooerConsistencyError
})
const getTattooer = makeGetTattooer({ getMongooseErrors, Tattooer })
const updateTattooer = makeUpdateTattooer({
  getMongooseErrors,
  Tattooer,
  sanitize: sanitizeTattooer,
  getDuplicateError: getTattooerDuplicateError,
  getConsistencyError: getTattooerConsistencyError
})
const deleteTattooer = makeDeleteTattooer({ getMongooseErrors, Tattooer })
const findTattooers = makeFindTattooers({ Tattooer, ObjectId })

module.exports.setRoutes = (app) => {
  app
  .use('/styles', makeStyle({
    Router, createStyle, getStyle, updateStyle, deleteStyle
  }))
  .use('/rankings', makeRanking({
    Router, createRanking, getRanking, updateRanking, deleteRanking
  }))
  .use('/tattooers', makeTattooer({
    Router, createTattooer, getTattooer, updateTattooer, deleteTattooer, findTattooers
  }))
}

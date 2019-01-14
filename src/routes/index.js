import { Router } from 'express'

import getMongooseErrors from '../misc/getMongooseErrors'
import { Style } from '../models'

import makeStyle from './style/make-index'
import makeCreateStyle from './style/make-createStyle'
import makeGetStyle from './style/make-getStyle'
import makeUpdateStyle from './style/make-updateStyle'
import makeDeleteStyle from './style/make-deleteStyle'

const createStyle = makeCreateStyle({ getMongooseErrors, Style })
const getStyle = makeGetStyle({ getMongooseErrors, Style })
const updateStyle = makeUpdateStyle({ getMongooseErrors, Style })
const deleteStyle = makeDeleteStyle({ getMongooseErrors, Style })

module.exports.setRoutes = (app) => {
  app.use('/styles', makeStyle({
    Router, createStyle, getStyle, updateStyle, deleteStyle
  }))
};

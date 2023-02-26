import 'reflect-metadata'
import {Container} from 'inversify'
import ViewEngineService from '../view/services/interfaces/ViewEngineService'
import ReactEngineService from "../view/services/ReactEngineService";

const inversifyContainer = new Container()
inversifyContainer.bind<ViewEngineService>('ViewEngineService').to(ReactEngineService)
export default inversifyContainer

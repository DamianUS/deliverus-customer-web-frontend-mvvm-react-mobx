import ViewEngineService from "./view/services/interfaces/ViewEngineService"
import inversifyContainer from './config/inversify.config'

const _viewEngineService = inversifyContainer.get<ViewEngineService>("ViewEngineService");
_viewEngineService.initialize()

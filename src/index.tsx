import ViewEngine from "./view/services/interfaces/ViewEngine"
import inversifyContainer from './config/inversify.config'

const _viewEngineService = inversifyContainer.get<ViewEngine>("ViewEngineService");
_viewEngineService.initialize()

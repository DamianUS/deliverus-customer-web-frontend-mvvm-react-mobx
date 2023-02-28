import 'reflect-metadata'
import {Container} from 'inversify'
import ViewEngineService from '../view/services/interfaces/ViewEngineService'
import ReactEngineService from "../view/services/ReactEngineService";
import Repository from "../model/interfaces/Repository";
import Restaurant from "../model/restaurant/Restaurant";
import MockRestaurantRepository from "../model/restaurant/mockRespository/MockRestaurantRepository";
import IndexRestaurantsViewModel from "../viewmodel/restaurants/IndexRestaurantsViewModel";
import GlobalState from "../viewmodel/GlobalState";

const inversifyContainer = new Container()
inversifyContainer.bind<ViewEngineService>('ViewEngineService').to(ReactEngineService)
inversifyContainer.bind<Repository<Restaurant>>('RestaurantRepository').to(MockRestaurantRepository)
inversifyContainer.bind<IndexRestaurantsViewModel>('IndexRestaurantsViewModel').to(IndexRestaurantsViewModel).inSingletonScope()
inversifyContainer.bind<GlobalState>('GlobalState').to(GlobalState).inSingletonScope()

export default inversifyContainer

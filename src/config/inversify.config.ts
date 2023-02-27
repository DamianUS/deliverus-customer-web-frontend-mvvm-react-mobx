import 'reflect-metadata'
import {Container} from 'inversify'
import ViewEngineService from '../view/services/interfaces/ViewEngineService'
import ReactEngineService from "../view/services/ReactEngineService";
import Repository from "../model/interfaces/Repository";
import Restaurant from "../model/restaurant/Restaurant";
import MockRestaurantRepository from "../model/restaurant/mockRespository/MockRestaurantRepository";

const inversifyContainer = new Container()
inversifyContainer.bind<ViewEngineService>('ViewEngineService').to(ReactEngineService)
inversifyContainer.bind<Repository<Restaurant>>('RestaurantRepository').to(MockRestaurantRepository)

export default inversifyContainer

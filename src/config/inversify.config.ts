import 'reflect-metadata'
import {Container} from 'inversify'
import ViewEngineService from '../view/services/interfaces/ViewEngineService'
import ReactEngineService from "../view/services/ReactEngineService";
import Repository from "../model/interfaces/Repository";
import Restaurant from "../model/restaurant/Restaurant";
import MockRestaurantRepository from "../model/restaurant/mockRespository/MockRestaurantRepository";
import IndexRestaurantsViewModel from "../viewmodel/restaurants/IndexRestaurantsViewModel";
import GlobalState from "../viewmodel/GlobalState";
import User from "../model/user/User";
import MockUserRepository from "../model/user/mockRepository/MockUserRepository";
import LoginViewModel from "../viewmodel/authentication/LoginViewModel";
import RestaurantRepository from "../model/restaurant/interfaces/RestaurantRepository";
import UserRepository from "../model/user/interfaces/UserRepository";
import AuthenticationRepository from "../model/authentication/interfaces/AuthenticationRepository";
import MockAuthenticationRepository from "../model/authentication/MockAuthenticationRepository";

const inversifyContainer = new Container()
//Global configurations
inversifyContainer.bind<ViewEngineService>('ViewEngineService').to(ReactEngineService)
inversifyContainer.bind<GlobalState>('GlobalState').to(GlobalState).inSingletonScope()

//Repositories
inversifyContainer.bind<RestaurantRepository>('RestaurantRepository').to(MockRestaurantRepository)
inversifyContainer.bind<UserRepository>('UserRepository').to(MockUserRepository)
inversifyContainer.bind<AuthenticationRepository>('AuthenticationRepository').to(MockAuthenticationRepository)

//ViewModels
inversifyContainer.bind<IndexRestaurantsViewModel>('IndexRestaurantsViewModel').to(IndexRestaurantsViewModel).inSingletonScope()
inversifyContainer.bind<LoginViewModel>('LoginViewModel').to(LoginViewModel).inSingletonScope()

export default inversifyContainer

import 'reflect-metadata'
import {Container} from 'inversify'
import ViewEngine from '../view/services/interfaces/ViewEngine'
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
import TokenStorer from "../view/services/interfaces/TokenStorer";
import BrowserLocalStorageStorer from "../view/services/BrowserLocalStorageStorer";
import LogoutViewModel from "../viewmodel/authentication/LogoutViewModel";
import HomeRouteProvider from "../view/react/routes/HomeRouteProvider";

const inversifyContainer = new Container()
inversifyContainer.bind<GlobalState>('GlobalState').to(GlobalState).inSingletonScope()

//Repositories
inversifyContainer.bind<RestaurantRepository>('RestaurantRepository').to(MockRestaurantRepository)
inversifyContainer.bind<UserRepository>('UserRepository').to(MockUserRepository)
inversifyContainer.bind<AuthenticationRepository>('AuthenticationRepository').to(MockAuthenticationRepository)

//ViewModels
inversifyContainer.bind<IndexRestaurantsViewModel>('IndexRestaurantsViewModel').to(IndexRestaurantsViewModel).inSingletonScope()
inversifyContainer.bind<LoginViewModel>('LoginViewModel').to(LoginViewModel).inSingletonScope()
inversifyContainer.bind<LogoutViewModel>('LogoutViewModel').to(LogoutViewModel).inSingletonScope()

//View
inversifyContainer.bind<ViewEngine>('ViewEngineService').to(ReactEngineService)
inversifyContainer.bind<TokenStorer>('TokenStorer').to(BrowserLocalStorageStorer)
inversifyContainer.bind<HomeRouteProvider>('HomeRouteProvider').to(HomeRouteProvider)

export default inversifyContainer

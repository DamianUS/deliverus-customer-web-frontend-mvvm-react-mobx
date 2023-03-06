import 'reflect-metadata'
import {Container} from 'inversify'
import ViewEngine from '../view/services/interfaces/ViewEngine'
import ReactEngineService from "../view/services/ReactEngineService";
import Repository from "../model/interfaces/Repository";
import Restaurant from "../model/models/restaurant/Restaurant";
import MockRestaurantRepository from "../model/repositories/mock/restaurant/MockRestaurantRepository";
import IndexRestaurantsViewModel from "../viewmodel/restaurants/IndexRestaurantsViewModel";
import GlobalState from "../viewmodel/GlobalState";
import User from "../model/models/user/User";
import MockUserRepository from "../model/repositories/mock/user/MockUserRepository";
import LoginViewModel from "../viewmodel/authentication/LoginViewModel";
import RestaurantRepository from "../model/models/restaurant/interfaces/RestaurantRepository";
import UserRepository from "../model/models/user/interfaces/UserRepository";
import AuthenticationRepository from "../model/models/authentication/interfaces/AuthenticationRepository";
import MockAuthenticationRepository from "../model/repositories/mock/authentication/MockAuthenticationRepository";
import TokenStorer from "../view/services/interfaces/TokenStorer";
import BrowserLocalStorageStorer from "../view/services/BrowserLocalStorageStorer";
import LogoutViewModel from "../viewmodel/authentication/LogoutViewModel";
import HomeRouteProvider from "../view/react/routes/HomeRouteProvider";
import OwnerRestaurantsViewModel from "../viewmodel/restaurants/OwnerRestaurantsViewModel";
import RestaurantCategoryRepository from "../model/models/restaurantCategory/interfaces/RestaurantCategoryRepository";
import MockRestaurantCategoryRepository
    from "../model/repositories/mock/restaurantCategory/MockRestaurantCategoryRepository";
import CreateRestaurantViewModel from "../viewmodel/restaurants/CreateRestaurantViewModel";

const inversifyContainer = new Container()
inversifyContainer.bind<GlobalState>('GlobalState').to(GlobalState).inSingletonScope()

//Repositories
inversifyContainer.bind<RestaurantRepository>('RestaurantRepository').to(MockRestaurantRepository)
inversifyContainer.bind<RestaurantCategoryRepository>('RestaurantCategoryRepository').to(MockRestaurantCategoryRepository)
inversifyContainer.bind<UserRepository>('UserRepository').to(MockUserRepository)
inversifyContainer.bind<AuthenticationRepository>('AuthenticationRepository').to(MockAuthenticationRepository)

//ViewModels
inversifyContainer.bind<LoginViewModel>('LoginViewModel').to(LoginViewModel).inSingletonScope()
inversifyContainer.bind<LogoutViewModel>('LogoutViewModel').to(LogoutViewModel).inSingletonScope()
////Restaurants
inversifyContainer.bind<IndexRestaurantsViewModel>('IndexRestaurantsViewModel').to(IndexRestaurantsViewModel).inSingletonScope()
inversifyContainer.bind<OwnerRestaurantsViewModel>('OwnerRestaurantsViewModel').to(OwnerRestaurantsViewModel).inSingletonScope()
inversifyContainer.bind<CreateRestaurantViewModel>('CreateRestaurantViewModel').to(CreateRestaurantViewModel).inSingletonScope()


//View
inversifyContainer.bind<ViewEngine>('ViewEngineService').to(ReactEngineService)
inversifyContainer.bind<TokenStorer>('TokenStorer').to(BrowserLocalStorageStorer)
inversifyContainer.bind<HomeRouteProvider>('HomeRouteProvider').to(HomeRouteProvider)

export default inversifyContainer

import React from 'react';
import inversifyContainer from "../../../config/inversify.config";
import IndexRestaurantsViewModel from "../../../viewmodel/restaurants/IndexRestaurantsViewModel";

function RestaurantList() {

    const viewModel = inversifyContainer.get<IndexRestaurantsViewModel>("IndexRestaurantsViewModel");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    React.useEffect(() => {
        console.log("empiezo a cargar restaurantes")

        const initializer = async () =>{
            await viewModel.onPageLoad()
            console.log(`Tengo ${viewModel.restaurants.length} restaurantes`)
            console.log('El backend error es '+viewModel.backendError)
        }
        initializer()
    }, [viewModel])

    return (
    <div className="App">
      <header className="App-header">

        <p>
            Hola
        </p>
      </header>
    </div>
  );
}

export default RestaurantList;

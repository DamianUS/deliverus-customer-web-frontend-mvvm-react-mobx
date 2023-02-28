import React from 'react';
import inversifyContainer from "../../../config/inversify.config";
import IndexRestaurantsViewModel from "../../../viewmodel/restaurants/IndexRestaurantsViewModel";
import { observer } from "mobx-react-lite"


const RestaurantList = observer(() => {

    const [viewModel] = React.useState(inversifyContainer.get<IndexRestaurantsViewModel>("IndexRestaurantsViewModel"))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    React.useEffect(() => {
        const initializer = async () =>{
            await viewModel.onPageLoad()
        }
        initializer()
    }, [viewModel])

    return (
    <div className="App">
      <header className="App-header">

          {viewModel.backendError && <p>Error</p>}

          {viewModel.loading &&
              <p>Cargando</p>
          }
          {!viewModel.loading &&
              <p>
                  Tengo {viewModel.restaurants.length} restaurantes cargados
              </p>
          }
      </header>
    </div>
  );
});

export default RestaurantList;

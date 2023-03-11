import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = searchText => {
    setSearchText(searchText);
  };

  return (
    <Layout>
      <Toaster />
      <Searchbar onSearch={handleSubmit} />
      <ImageGallery value={searchText} />
      <GlobalStyle />
    </Layout>
  );
};

// export class App extends Component {
//   state = {
//     searchText: '',
//   };

//   handleSubmit = searchText => {
//     this.setState({ searchText });
//   };

//   render() {
//     return (
//       <Layout>
//         <Toaster />
//         <Searchbar onSearch={this.handleSubmit} />
//         <ImageGallery value={this.state.searchText} />
//         <GlobalStyle />
//       </Layout>
//     );
//   }
// }

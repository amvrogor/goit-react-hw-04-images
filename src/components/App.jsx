import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = text => {
    if (text !== searchText) setPage(1);
    setSearchText(text);
  };

  return (
    <Layout>
      <Toaster />
      <Searchbar onSearch={handleSubmit} />
      <ImageGallery value={searchText} page={page} setPage={setPage} />
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

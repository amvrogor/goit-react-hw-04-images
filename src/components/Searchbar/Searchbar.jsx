import { useState } from 'react';
import { toast } from 'react-hot-toast';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value.trim()) {
      e.target.reset();
      return toast.error('Please enter search query');
    }
    onSearch(value);
    setValue('');
    e.target.reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};

// export class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleChange = ({ target: { value } }) => {
//     this.setState({ value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (!this.state.value.trim()) {
//       e.target.reset();
//       return toast.error('Please enter search query');
//     }
//     this.props.onSearch(this.state.value);
//     this.setState({ value: '' });
//     e.target.reset();
//   };

//   render() {
//     return (
//       <Header>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit">
//             <BsSearch />
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }

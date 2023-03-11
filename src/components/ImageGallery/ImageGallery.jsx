import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { Loader } from 'components/Loader/Loader';
import { pixaBayAPI } from 'components/Services/PixaBayApi';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const ImageGallery = ({ value, page, setPage }) => {
  const [hits, setHits] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (page === 1) {
      setHits([]);
      setTotalHits(0);
    }

    setStatus(Status.PENDING);

    pixaBayAPI(value.trim().toLowerCase(), page)
      .then(data => {
        if (data.hits.length === 0) {
          setHits([]);
          setTotalHits(0);
          setStatus(Status.RESOLVED);
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setHits(prevHits => [...prevHits, ...data.hits]);
          setTotalHits(data.totalHits);
          setStatus(Status.RESOLVED);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [value, page]);

  const handleLoad = () => {
    setPage(prev => prev + 1);
  };

  if (status === 'pending' && hits.length === 0) return <Loader />;

  if (status === 'resolved' || hits.length !== 0)
    return (
      <>
        <ImageList>
          {hits.map(hit => (
            <ImageGalleryItem key={hit.id} hit={hit} />
          ))}
        </ImageList>
        {status === 'pending' ? <Loader /> : ''}
        {totalHits > hits.length ? <Button onLoad={handleLoad} /> : ''}
      </>
    );

  if (status === 'rejected') return <h1>{error.message}</h1>;
};

// export class ImageGallery extends Component {
//   state = {
//     hits: [],
//     error: '',
//     status: 'idle',
//     page: 1,
//     totalHits: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevProps.value !== this.props.value ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ status: 'pending' });

//       if (prevProps.value !== this.props.value) prevState.page = 1;

//       pixaBayAPI(this.props.value.trim().toLowerCase(), this.state.page)
//         .then(data => {
//           if (data.hits.length === 0) {
//             this.setState({
//               hits: [],
//               status: 'resolved',
//               totalHits: 0,
//             });
//             return toast.error(
//               'Sorry, there are no images matching your search query. Please try again.'
//             );
//           }
//           if (prevProps.value !== this.props.value) {
//             this.setState({
//               hits: [...data.hits],
//               status: 'resolved',
//               totalHits: data.totalHits,
//             });
//           } else {
//             this.setState({
//               hits: [...this.state.hits, ...data.hits],
//               status: 'resolved',
//             });
//           }
//         })
//         .catch(error => {
//           console.log(error);
//           this.setState({ error, status: 'rejected' });
//         });
//     }
//   }

//   handleLoad = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   render() {
//     const { status, hits, error, totalHits } = this.state;
//     if (status === 'pending' && hits.length === 0) return <Loader />;

//     if (status === 'resolved' || hits.length !== 0)
//       return (
//         <>
//           <ImageList>
//             {hits.map(hit => (
//               <ImageGalleryItem
//                 key={hit.id}
//                 hit={hit}
//                 onOpen={this.props.onOpen}
//               />
//             ))}
//           </ImageList>
//           {status === 'pending' ? <Loader /> : ''}
//           {totalHits > hits.length ? <Button onLoad={this.handleLoad} /> : ''}
//         </>
//       );

//     if (status === 'rejected') return <h1>{error.message}</h1>;
//   }
// }

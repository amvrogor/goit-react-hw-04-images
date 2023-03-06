import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Image, ImageItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.hit;
    return (
      <ImageItem onClick={this.toggleModal}>
        <Image src={webformatURL} alt={tags} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageItem>
    );
  }
}

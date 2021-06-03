import React from 'react';
import downloadIcon from '../assets/images/download.png';
import '../assets/styles/share.css';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const Share = ({ shareUrl, text, imageUrl }) => {
  return (
    <div>
      <FacebookShareButton url={shareUrl} quote={text} className="shareButton">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} quote={text} className="shareButton">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} quote={text} className="shareButton">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={shareUrl} quote={text} className="shareButton">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={shareUrl} quote={text} className="shareButton">
        <EmailIcon size={32} round />
      </EmailShareButton>
      <TelegramShareButton url={shareUrl} quote={text} className="shareButton">
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <a href={imageUrl} download>
        <img src={downloadIcon} width={32} className="shareButton" />
      </a>
    </div>
  );
};

export default Share;

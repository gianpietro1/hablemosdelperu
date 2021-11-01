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
    <div className="shareDiv">
      <FacebookShareButton url={shareUrl} quote={text} className="shareButton">
        <FacebookIcon round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} quote={text} className="shareButton">
        <TwitterIcon round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} quote={text} className="shareButton">
        <WhatsappIcon round />
      </WhatsappShareButton>
      <LinkedinShareButton url={shareUrl} quote={text} className="shareButton">
        <LinkedinIcon round />
      </LinkedinShareButton>
      <EmailShareButton url={shareUrl} quote={text} className="shareButton">
        <EmailIcon round />
      </EmailShareButton>
      <TelegramShareButton url={shareUrl} quote={text} className="shareButton">
        <TelegramIcon round />
      </TelegramShareButton>
      <a href={imageUrl} download>
        <img src={downloadIcon} className="shareButton" />
      </a>
    </div>
  );
};

export default Share;

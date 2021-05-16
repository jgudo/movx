import { IGenre } from '@app/types/types';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  genre: IGenre;
}

const GenreCard: React.FC<IProps> = ({ genre }) => {
  const { id, name } = genre;
  const genreName = name.split(' ')[0].toLowerCase();

  return (
    <div
      className="genre__card"
      style={{
        background: `url(${require(`@app/assets/images/${genreName}.jpg`)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Link to={`/genre/${name.toLowerCase().replace(' ', '-')}/${id}`}>
        <h1>{name || 'Not Available'}</h1>
      </Link>
    </div>
  );
};

export default GenreCard;

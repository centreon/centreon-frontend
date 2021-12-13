import React from 'react';

import LoadingSkeleton from '../LoadingSkeleton';

const ListingLoadingSkeleton = (): JSX.Element => (
  <>
    {['skeleton1', 'skeleton2', 'skeleton3'].map((key) => (
      <LoadingSkeleton height={20} key={key} />
    ))}
  </>
);

export default ListingLoadingSkeleton;

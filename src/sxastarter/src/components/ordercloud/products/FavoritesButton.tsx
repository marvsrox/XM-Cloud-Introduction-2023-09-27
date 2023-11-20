/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Me, ProductCollection } from 'ordercloud-javascript-sdk';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';
import { HiOutlineHeart } from 'react-icons/hi';
import { useOcSelector } from 'src/redux/ocStore';

export default function FavoritesListButton(
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const [loading, setLoading] = useState(false);
  const { isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
  }));
  const [favoritesList, setFavoritesList] = useState([] as ProductCollection[]);

  useEffect(() => {
    const initialize = async () => {
      // favorites stuff
      if (isAnonymous) return;
      const favoritesList = await Me.ListProductCollections({ sortBy: ['Name'] });
      setFavoritesList(favoritesList.Items);
    };
    initialize();
  }, []);

  const addItem = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('added item to favorites');
  }, []);
  const removeItem = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('removed item from favorites');
  }, []);

  const handleWishlistChange = useCallback(async (e: FormEvent) => {
    if (loading) return;

    // A login is required before adding an item to the wishlist
    if (isAnonymous) {
      window.location.replace('/login');
    }

    setLoading(true);

    try {
      if (favoritesList) {
        await removeItem(e);
      } else {
        await addItem(e);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box pos="absolute" right="3">
      <button aria-label="Add to wishlist" onClick={handleWishlistChange} {...props}>
        <HiOutlineHeart size="24px" color="#138888" fill="#fff" />
      </button>
    </Box>
  );
}

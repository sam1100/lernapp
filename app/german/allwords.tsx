import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { COIN_REASONS } from "@/convex/enums";
import { useQuery } from 'convex/react';
import React from 'react';
import GermanWordsSubject from './words';
const currentWordsButton = require('@/assets/images/allwords.png');

type GermanWords = Doc<"german_words">;

const AllWords = () => {
    const words: GermanWords[] | undefined = useQuery(api.german.getAllWords);

    return (
        <GermanWordsSubject headerImage={currentWordsButton} words={words ?? null} reason={COIN_REASONS.GERMAN_ALL_WORDS} />
    )
}

export default AllWords
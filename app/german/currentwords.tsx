import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { COIN_REASONS } from "@/convex/enums";
import { useQuery } from 'convex/react';
import React from 'react';
import GermanWordsSubject from './germanWordsSubject';
const currentWordsButton = require('@/assets/images/newwords.png');

type GermanWords = Doc<"german_words">;

const CurrentWords = () => {
    const words: GermanWords[] | undefined = useQuery(api.german.getCurrentWords);

    return (
        <GermanWordsSubject headerImage={currentWordsButton} words={words ?? null} reason={COIN_REASONS.GERMAN_CURRENT_WORDS} />
    )
}

export default CurrentWords
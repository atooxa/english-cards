import './ExploreCards.scss';
import { h, FunctionalComponent } from 'preact';
import { memo, useCallback, useEffect, useMemo, useState } from 'preact/compat';
import block from 'bem-cn';
import { useParams } from 'react-router-dom';
import { Button, Heading } from 'boarder-components';
import CARDS from 'common/constants/cards';

import { IUser } from 'common/types/user';

import httpClient from 'client/utilities/HttpClient/HttpClient';

const b = block('ExploreCards');

const ExploreCards: FunctionalComponent = () => {
  const { login } = useParams<{ login: string }>();

  const [user, setUser] = useState<IUser | null>(null);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [notLearnedCardIndexes, setNotLearnedCardIndexes] = useState<
    number[] | null
  >(null);

  const card = useMemo(() => {
    if (cardIndex === null) {
      return null;
    }

    return CARDS[cardIndex];
  }, [cardIndex]);

  const pickNextCard = useCallback(() => {
    if (!notLearnedCardIndexes) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * notLearnedCardIndexes.length,
    );

    const cardIndex = notLearnedCardIndexes[randomIndex];

    setCardIndex(cardIndex);
  }, [notLearnedCardIndexes]);

  const removeCardFromNotLearned = useCallback(() => {
    if (!notLearnedCardIndexes || cardIndex === null) {
      return;
    }

    const notLearnedCardsIndex = notLearnedCardIndexes.findIndex(
      (i) => i === cardIndex,
    );

    setNotLearnedCardIndexes([
      ...notLearnedCardIndexes.slice(0, notLearnedCardsIndex),
      ...notLearnedCardIndexes.slice(notLearnedCardsIndex + 1),
    ]);
  }, [cardIndex, notLearnedCardIndexes]);

  const handleAddToLearning = useCallback(async () => {
    if (cardIndex === null) {
      return;
    }

    removeCardFromNotLearned();

    await httpClient.addToLearningWords({
      userLogin: login,
      wordIndex: cardIndex,
    });
  }, [cardIndex, login, removeCardFromNotLearned]);

  const handleAddToLearned = useCallback(async () => {
    if (cardIndex === null) {
      return;
    }

    removeCardFromNotLearned();

    await httpClient.addToLearnedWords({
      userLogin: login,
      wordIndex: cardIndex,
    });
  }, [cardIndex, login, removeCardFromNotLearned]);

  useEffect(() => {
    (async () => {
      const { user: requestedUser } = await httpClient.getUser({ login });

      setUser(requestedUser);

      const notLearnedNewCardsIds = CARDS.reduce<number[]>(
        (accNewIds, cardInfo, index) => {
          if (
            !requestedUser.learnedCardIndexes.includes(index) &&
            !requestedUser.learningCardIndexes.includes(index)
          ) {
            accNewIds.push(index);
          }

          return accNewIds;
        },
        [],
      );

      setNotLearnedCardIndexes(notLearnedNewCardsIds);
    })();
  }, [login]);

  useEffect(() => {
    pickNextCard();
  }, [pickNextCard]);

  if (!card) {
    return null;
  }

  const [text, translation] = card;

  return (
    <div className={b()}>
      <Heading className={b('word')} level={1}>
        {text}
      </Heading>

      <div className={b('translation')}>{translation}</div>

      <Button
        className={b('addToLearningButton')}
        onClick={handleAddToLearning}
      >
        Учить
      </Button>

      <Button className={b('addToLearnedButton')} onClick={handleAddToLearned}>
        Знаю
      </Button>
    </div>
  );
};

export default memo(ExploreCards);

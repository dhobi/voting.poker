import {Box, Modal, Theme} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import BasePage from '@root/shared/components/BasePage';
import Cards from '@root/shared/components/Cards';
import ModeratorModal from '@root/shared/components/ModeratorModal';
import Results from '@root/shared/components/Results';
import RoomDetails from '@root/shared/components/RoomDetails';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import React from 'react';
import Error from './_error';

import Lobby from '@root/shared/components/Lobby';
import {useRoom} from '@root/shared/hooks/useRoom';
import {AvatarProvider} from '@root/shared/components/AvatarProvider';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5),
    display: 'flex',
    gap: theme.spacing(4),
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      gap: theme.spacing(1),
    },
  },
}));

interface RoomLayoutProps {
  roomId: string;
}

const RoomLayout: React.FC<RoomLayoutProps> = ({roomId}) => {
  const classes = useStyle();
  const {user, userId, users, updateUser, moderatorSeatOpen, sessionId, ended, votes} = useRoom(
    roomId
  );

  return (
    <BasePage>
      <Modal open={moderatorSeatOpen}>
        <ModeratorModal updateUser={updateUser} roomId={roomId} />
      </Modal>
      <Box className={classes.root}>
        <RoomDetails
          users={users}
          user={user}
          updateUser={updateUser}
          sessionId={sessionId}
          ended={ended}
          roomId={roomId}
        />

        {!sessionId && <Lobby moderator={user?.moderator} />}
        {sessionId && !ended && <Cards userId={userId} roomId={roomId} />}
        {ended && <Results users={users} votes={votes} />}
      </Box>
    </BasePage>
  );
};

const Room: NextPage = () => {
  const router = useRouter();
  const {id} = router.query as {id: string};

  if (!id) {
    return <Error statusCode={404} />;
  }

  return (
    <AvatarProvider roomId={id}>
      <RoomLayout roomId={id} />
    </AvatarProvider>
  );
};

export default Room;

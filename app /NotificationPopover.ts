// @ts-nocheck
import React, { useState } from 'react';
import { Box, Stack, Text } from '@indeed/ifl-components';

import useText from '../text';

import { Candidate } from '../../../types/Candidate';
import SendAlertButton from '../SendAlertButton';
import CallNowLink from './CallNowLink';
import NotificationSent from '../../PreCallSMS/NotificationSent';
import ModalNavigation from '../ModalNavigation';

type Props = {
    candidate: Candidate;
    hidePrecallSms: () => void;
    showBack?: boolean;
    onExit: () => void;
    setFullSize?: (fullSize: boolean) => void;
};

const PrecallSmsContent = ({
    candidate,
    hidePrecallSms,
    onExit,
    showBack,
    setFullSize = () => {}
}: Props): JSX.Element => {
    const isMobile = useBreakpointAndSmaller('sm');
    const { precallSmsText } = useText();
    const [showNotificationAlert, setShowNotificationAlert] = useState<boolean>(false);

    // For MVP, hardcoded to 5 minutes. Future might allow employers to choose this delay.
    const delayInMinutes = 5;

    // Show PrecallSMS sent notification alert

    const handleAlertCallback = (): void => {
        setShowNotificationAlert(true);
        setFullSize(true);
    };

    return (
        //these are Indeed IFL components, this is proprietary to Indeed and shares some similarites with the Material UI framework
        <Box>
            {!showNotificationAlert ? (
                <Stack spacing={2} vertical alignment="fill" sx={{ padding: 2 }}>
                    <Text
                        level={3}
                        sx={{ fontWeight: 'bold', marginBottom: 5, color: 'neutral.1000' }}
                    >
                        {precallSmsText.promptHeader(candidate.name.split(' ')[0])}
                    </Text>
                    <Text level={1}>
                        {precallSmsText.promptBody(candidate.name.split(' ')[0], delayInMinutes)}
                    </Text>
                    <SendAlertButton candidate={candidate} onClick={handleAlertCallback} />
                    <CallNowLink candidate={candidate} onClick={hidePrecallSms} />
                </Stack>
            ) : (
                <>
                    <ModalNavigation
                        title={' '}
                        isStartPage={false}
                        onClose={onExit}
                        showBack={showBack}
                    />
                    <NotificationSent candidate={candidate} onDismiss={hidePrecallSms} />
                </>
            )}
        </Box>
    );
};

export default PrecallSmsContent;

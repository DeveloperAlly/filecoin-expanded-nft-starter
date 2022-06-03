//move transactions to a toast context provider
//www.codementor.io/@hurwitzse/how-i-create-my-own-react-hooks-and-why-you-should-too-1t6dseymmo
import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const StatusMessage = ({ status, ...props }) => {
  const { loading, error, success, warning } = status;
  return (
    <div
      style={{
        paddingTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      {status ? (
        <div style={{ color: 'white' }}>
          <Message
            compact
            icon
            negative={Boolean(status.error)}
            success={Boolean(status.success) && !status.loading}
            info={Boolean(status.loading)}
            warning={Boolean(status.warning)}>
            <Icon
              name={
                status.loading
                  ? 'circle notched'
                  : status.error
                  ? 'times circle'
                  : status.success
                  ? 'check circle'
                  : 'exclamation circle'
              }
              loading={Boolean(status.loading)}
            />
            <Message.Content>
              {Boolean(status.success) && !status.loading && (
                <Message.Header>Transaction Success!</Message.Header>
              )}
              {status.loading
                ? status.loading
                : status.error
                ? status.error
                : status.success
                ? status.success
                : status.warning}
            </Message.Content>
          </Message>
        </div>
      ) : null}
    </div>
  );
};

StatusMessage.propTypes = {
  status: PropTypes.shape({
    loading: PropTypes.string,
    error: PropTypes.any,
    success: PropTypes.any,
    warning: PropTypes.any
  })
};

export default StatusMessage;

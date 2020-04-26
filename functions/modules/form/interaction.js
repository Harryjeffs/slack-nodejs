exports.handler = function(req, res) {
    // Initialize using signing secret from environment variables
    const { createMessageAdapter } = require('@slack/interactive-messages');
    const slackSigningSecret = "44c6b4fbd8662761842c81f7bc5c8d75";
    const slackInteractions = createMessageAdapter(slackSigningSecret);
    const port = process.env.PORT || 7090;

    // Handle interactions from messages containing an action block with an `action_id` of `select_coffee`
    slackInteractions.action({ actionId: 'invitation_decline' }, (payload, respond) => {
        // `payload` contains information about the action
        // Block Kit Builder can be used to explore the payload shape for various action blocks:
        // https://api.slack.com/tools/block-kit-builder

        return {
            text: 'Invitation Decline',
        }
    });

// Handle interactions from messages containing an action block with an `action_id` of `select_coffee`
    slackInteractions.action({ actionId: 'invitation_accept' }, (payload, respond) => {
        // `payload` contains information about the action
        // Block Kit Builder can be used to explore the payload shape for various action blocks:
        // https://api.slack.com/tools/block-kit-builder

        return {
            text: 'Invitation Accepted',
        }
    });
};
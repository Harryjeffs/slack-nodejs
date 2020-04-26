const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv').config();

function blockJson(data) {
    data = data.body.form_response.answers;

    var  warning;

    if (data[2].choice.label == "Vendor"){
        warning = {
            "type": "context",
            "elements": [
                {
                    "type": "image",
                    "image_url": "https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png",
                    "alt_text": "notifications warning icon"
                },
                {
                    "type": "mrkdwn",
                    "text": "Please note accepting this application will invite them as a *single channel guest*"
                }
            ]
        };
    }

    return {
        "response_type": "in_channel",
        "channel": 'C011A0LLB16',
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*You have a new application.*"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Full Name:*\n " + data[0].text
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Business:*\n "  + data[1].text
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Category:*\n " + data[2].choice.label
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Email:*\n " + data[3].email
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Website:*\n <" + data[4].email + "|" + data[4].email +">"
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "Accepting an application will send an email with an invite link, to the email specified in the application. "
                    }
                ]
            },
            warning,
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Accept"
                        },
                        "style": "primary",
                        "value": "click_me_123",
                        "action_id": "invitation_accept"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Decline"
                        },
                        "style": "danger",
                        "value": "click_me_123",
                        "action_id": "invitation_decline"
                    }
                ]
            }
        ]
    }
}

exports.handler = function(req, res) {
    // An access token (from your Slack app or custom integration - xoxp, xoxb)
    const token = "xoxb-14628126167-1034093640705-n7Zwcv9I8pJY4qyhEepWxT9U"; //process.env.SLACK_TOKEN;

    const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    const conversationId = 'C011A0LLB16';

    (async () => {
        await web.chat.postMessage(blockJson(req));
    })();
};
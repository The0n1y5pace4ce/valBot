import { ICommand } from "wokcommands";
import ms from "ms";


export default {
    category: 'Moderation',
    description: 'Timeouts a member',
    slash: true,
    testOnly: true,
    permissions: ['MANAGE_ROLES'],
    options: [
        {
            name: 'user',
            description: 'Member to timeout',
            type: 'USER',
            required: true
        },

        {
            name: 'length',
            description: 'For how long you want to timeout a member',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            type: 'STRING',
            description: 'The reason for the timeout',
            required: true,
        },
    ],

        callback: async ({ client, interaction }) => {  //callback function
        let user = interaction.guild.members.cache.get(interaction.options.getUser('user').id) //getting the user ID
        let length = ms(interaction.options.getString("length"))
        let reason = interaction.options.getString("reason")

        if(!length)
        return "Please provide valid length for the timeout!"

        user.timeout(length, reason) // finally timing out the member

        return `${user} has been timed out for ${reason}` 
      
    
    }
} as ICommand
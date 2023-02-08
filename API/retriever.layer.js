"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieverLayer = void 0;
const sender_layer_1 = require("./sender.layer");
const layers_interface_1 = require("../helpers/layers-interface");
class RetrieverLayer extends sender_layer_1.SenderLayer {
    constructor(page, session, options) {
        super(page, session, options);
        this.page = page;
    }
    /**
     * Returns a list of mute and non-mute users
     * @param type return type: all, toMute and noMute.
     * @returns obj
     */
    async getListMutes(type) {
        return await this.page.evaluate((type) => WAPI.getListMute(type), type);
    }
    /**
     * Returns browser session token
     * @returns obj [token]
     */
    async getSessionTokenBrowser(removePath) {
        if (removePath === true) {
            await this.page.evaluate(() => {
                window['pathSession'] = true;
            });
        }
        return await this.page.evaluate(() => WAPI.getSessionTokenBrowser());
    }
    /**
     * Receive the current theme
     * @returns string light or dark
     */
    async getTheme() {
        return await this.page.evaluate(() => WAPI.getTheme());
    }
    /**
     * Receive all blocked contacts
     * @returns array of [0,1,2,3....]
     */
    async getBlockList() {
        return await this.page.evaluate(() => WAPI.getBlockList());
    }
    /**
     * Retrieves all chats
     * @returns array of [Chat]
     */
    async getAllChats() {
        return await this.page.evaluate(() => {
            let chats = WAPI.getAllChats();
            return chats;
        });
    }
    /**
     * Retrieves all chats new messages
     * @returns array of [Chat]
     */
    async getAllChatsNewMsg() {
        return await this.page.evaluate(() => {
            let chats = WAPI.getAllChatsWithNewMsg();
            return chats;
        });
    }
    /**
     * Retrieves all chats Contacts
     * @returns array of [Chat]
     */
    async getAllChatsContacts() {
        return await this.page.evaluate(() => {
            let chats = WAPI.getAllChats(), filter = chats.filter((chat) => chat.kind === 'chat');
            return filter;
        });
    }
    /**
     * Checks if a number is a valid WA number
     * @param contactId, you need to include the @c.us at the end.
     * @returns contact detial as promise
     */
    async checkNumberStatus(contactId) {
        return new Promise(async (resolve, reject) => {
            const result = await this.page.evaluate((contactId) => WAPI.checkNumberStatus(contactId), contactId);
            if (result && result['status'] !== 200) {
                reject(result);
            }
            else {
                resolve(result);
            }
        });
    }
    /**
     * Retrieves all chats with messages
     * @returns array of [Chat]
     */
    async getAllChatsWithMessages(withNewMessageOnly = false) {
        return this.page.evaluate((withNewMessageOnly) => WAPI.getAllChatsWithMessages(withNewMessageOnly), withNewMessageOnly);
    }
    /**
     * Retrieve all contact new messages
     * @returns array of groups
     */
    async getChatContactNewMsg() {
        // prettier-ignore
        const chats = await this.page.evaluate(() => WAPI.getAllChatsWithNewMsg());
        return chats.filter((chat) => chat.kind === 'chat');
    }
    /**
     * Retrieves contact detail object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    async getContact(contactId) {
        return this.page.evaluate((contactId) => WAPI.getContact(contactId), contactId);
    }
    /**
     * Retrieves all contacts
     * @returns array of [Contact]
     */
    async getAllContacts() {
        return await this.page.evaluate(() => WAPI.getAllContacts());
    }
    /**
     * Retrieve all groups
     * @category Group
     * @returns array of groups
     */
    async getAllGroups(withNewMessagesOnly = false) {
        return this.page.evaluate(async ({ withNewMessagesOnly }) => {
            const chats = await WPP.chat.list({
                onlyGroups: true,
                onlyWithUnreadMessage: withNewMessagesOnly
            });
            const groups = await Promise.all(chats.map((c) => WPP.group.ensureGroup(c.id)));
            return groups.map((g) => WAPI._serializeChatObj(g));
        }, { withNewMessagesOnly });
    }
    /**
     * Retrieves all chats Transmission list
     * @returns array of [Chat]
     */
    async getAllChatsTransmission() {
        return await this.page.evaluate(() => {
            let chats = WAPI.getAllChats();
            return chats.filter((chat) => chat.kind === 'broadcast');
        });
    }
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    async getChatById(contactId) {
        return this.page.evaluate((contactId) => WAPI.getChatById(contactId), contactId);
    }
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     * @deprecated
     */
    async getChat(contactId) {
        return this.getChatById(contactId);
    }
    /**
     * Retrieves chat picture
     * @param chatId Chat id
     * @returns url of the chat picture or undefined if there is no picture for the chat.
     */
    async getProfilePicFromServer(chatId) {
        return this.page.evaluate((chatId) => WAPI.getProfilePicFromServer(chatId), chatId);
    }
    /**
     * Load more messages in chat object from server. Use this in a while loop
     * @param contactId
     * @returns contact detial as promise
     * @deprecated
     */
    async loadEarlierMessages(contactId) {
        return this.page.evaluate((contactId) => WAPI.loadEarlierMessages(contactId), contactId);
    }
    /**
     * Retrieves status of given contact
     * @param contactId
     */
    async getStatus(contactId) {
        return this.page.evaluate((contactId) => WAPI.getStatus(contactId), contactId);
    }
    /**
     * Checks if a number is a valid whatsapp number
     * @param contactId, you need to include the @c.us at the end.
     * @returns contact detial as promise
     */
    async getNumberProfile(contactId) {
        return new Promise(async (resolve, reject) => {
            const typeFunction = 'getNumberProfile';
            const type = 'string';
            const check = [
                {
                    param: 'contactId',
                    type: type,
                    value: contactId,
                    function: typeFunction,
                    isUser: true
                }
            ];
            const validating = (0, layers_interface_1.checkValuesSender)(check);
            if (typeof validating === 'object') {
                return reject(validating);
            }
            const result = this.page.evaluate((contactId) => WAPI.getNumberProfile(contactId), contactId);
            if (result['erro'] == true) {
                reject(result);
            }
            else {
                resolve(result);
            }
        });
    }
    /**
     * check if it's beta
     * @returns boolean
     */
    async isBeta() {
        return await this.page.evaluate(() => WAPI.isBeta());
    }
    /**
     * Retrieves all undread Messages
     * @param includeMe
     * @param includeNotifications
     * @param useUnreadCount
     * @returns any
     * @deprecated
     */
    async getUnreadMessages(includeMe, includeNotifications, useUnreadCount) {
        return await this.page.evaluate(({ includeMe, includeNotifications, useUnreadCount }) => WAPI.getUnreadMessages(includeMe, includeNotifications, useUnreadCount), { includeMe, includeNotifications, useUnreadCount });
    }
    /**
     * Retrieves all unread messages (where ack is -1)
     * @returns list of messages
     */
    async getAllUnreadMessages() {
        return this.page.evaluate(() => WAPI.getAllUnreadMessages());
    }
    /**
     * Retrieves all new messages (where isNewMsg is true)
     * @returns List of messages
     * @deprecated Use getAllUnreadMessages
     */
    async getAllNewMessages() {
        return await this.page.evaluate(() => WAPI.getAllNewMessages());
    }
    /**
     * Retrieves all messages already loaded in a chat
     * For loading every message use loadAndGetAllMessagesInChat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    async getAllMessagesInChat(chatId, includeMe, includeNotifications) {
        return await this.page.evaluate(({ chatId, includeMe, includeNotifications }) => WAPI.getAllMessagesInChat(chatId, includeMe, includeNotifications), { chatId, includeMe, includeNotifications });
    }
    /**
     * Loads and Retrieves all Messages in a chat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    async loadAndGetAllMessagesInChat(chatId, includeMe = false, includeNotifications = false) {
        return await this.page.evaluate(({ chatId, includeMe, includeNotifications }) => WAPI.loadAndGetAllMessagesInChat(chatId, includeMe, includeNotifications), { chatId, includeMe, includeNotifications });
    }
    /**
     * Checks if a CHAT contact is online.
     * @param chatId chat id: xxxxx@c.us
     */
    async getChatIsOnline(chatId) {
        return await this.page.evaluate((chatId) => WAPI.getChatIsOnline(chatId), chatId);
    }
    /**
     * Retrieves the last seen of a CHAT.
     * @param chatId chat id: xxxxx@c.us
     */
    async getLastSeen(chatId) {
        return await this.page.evaluate((chatId) => WAPI.getLastSeen(chatId), chatId);
    }
}
exports.RetrieverLayer = RetrieverLayer;
//# sourceMappingURL=retriever.layer.js.map
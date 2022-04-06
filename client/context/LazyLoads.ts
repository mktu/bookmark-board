import * as ProfileService from '../services/profile'
import * as GroupService from '../services/group'
import * as BookmarkService from '../services/bookmark'
import * as CommentService from '../services/comment'
import * as ReactionService from '../services/reaction'
import * as RequestService from '../services/request'
import * as StorageService from '../services/storage'
import * as NotificationService from '../services/notification'
import * as CallableService from '../services/callable'
import * as SimilarityService from '../services/similarity'

export const services = {
    ...ProfileService,
    ...GroupService,
    ...BookmarkService,
    ...CommentService,
    ...ReactionService,
    ...RequestService,
    ...StorageService,
    ...NotificationService,
    ...CallableService,
    ...SimilarityService
}
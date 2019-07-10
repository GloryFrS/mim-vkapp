/*
 * Этот файл просто как сборщик, в него импортируются другие файлы и экспортируются уже из него 
 */

import customerTypes    from './customerTypes';
import customerServices from './customerServices';
import masters          from './masters';
import mastersServices  from './masterServices';
import review           from './review';
import SearchFilters    from './search-filters'
import vk_API           from './vk-api';
import customers        from './customers';
import encoding         from './encoding';

export default {

    customerTypes:    customerTypes,

    customerServices: customerServices,

    masters:          masters,

    mastersServices:  mastersServices,

    review:           review,

    searchFilters:    SearchFilters,

    fetchUser:              vk_API.fetchUser,

    fetchUserCoordinates:   vk_API.fetchUserCoordinates,

    setViewSettings:        vk_API.setViewSettings,

    share:                  vk_API.share,

    joinGroup:              vk_API.joinGroup,

    reg:                    customers,

    allowNotifications:     vk_API.allowNotifications,

    encoding:               encoding,
    
}
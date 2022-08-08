import uuid from 'react-native-uuid'

const MILLISECONDS_IN_SECOND = 1000
const SECONDS_IN_MINUTE      = 60
const MINUTES_IN_HOUR        = 60
const HOURS_IN_DAY           = 24

const SECONDS = MILLISECONDS_IN_SECOND
const MINUTES = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE
const HOURS   = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR
const DAYS    = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY

const time1 = (MINUTES * 15) + (SECONDS * 22)

const time2 = MINUTES * 8 + SECONDS * 35

const time3 = MINUTES * 10 + SECONDS * 30

const testImage = 'https://img.mako.co.il/2020/07/01/boboHOTEL_7_i.jpg'

const tasks = [
    {
        id:            uuid.v4(),
        title:         'Clean the Trash',
        status:        'Pending',
        department:    'Housekeeping',
        details:       'Including the coffee spilled around it + Take out all the bags to the main trash container. ',
        hasAttachment: false,
        location:      'Second elevator - first floor',
        priority:      'High',
        images:        [testImage],
        createdAt:     Date.now() - time1,
        time:          '00:15:22',
    },
    {
        id:            uuid.v4(),
        title:         'Clean the Trash',
        status:        'In Progress',
        department:    'Housekeeping',
        details:       'Including the coffee spilled around it + Take out all the bags to the main trash container.  ',
        hasAttachment: true,
        location:      'Second elevator - first floor',
        priority:      'Medium',
        images:        [testImage],
        createdAt:     Date.now() - time2,
        time:          '00:08:35',
        pickedBy:      'Chen Asulin'
    },
    {
        id:            uuid.v4(),
        title:         'Clean the Trash',
        status:        'In Progress',
        department:    'Housekeeping',
        details:       'Including the coffee spilled around it + Take out all the bags to the main trash container.',
        hasAttachment: true,
        location:      'Second elevator - first floor',
        priority:      'Low',
        images:        [testImage],
        createdAt:     Date.now() - time2,
        time:          '00:08:35',
        pickedBy:      'Chen Asulin'
    },
    {
        id:            uuid.v4(),
        title:         'Clean the Trash',
        status:        'Completed',
        department:    'Housekeeping',
        details:       'Including the coffee spilled around it + Take out all the bags to the main trash container.',
        hasAttachment: false,
        location:      'Second elevator - first floor',
        priority:      'Low',
        images:        [testImage],
        createdAt:     Date.now() - time2,
        time:          '00:08:35',
        pickedBy:      'Chen Asulin'
    },
    {
        id:            uuid.v4(),
        title:         'Clean the Trash',
        status:        'Completed',
        department:    'Housekeeping',
        details:       'Including the coffee spilled around it + Take out all the bags to the main trash container.',
        location:      'Second elevator - first floor',
        hasAttachment: false,
        priority:      'Low',
        images:        [testImage],
        createdAt:     Date.now() - time3,
        time:          '00:08:35',
        pickedBy:      'Chen Asulin'
    },
    {
        id:            uuid.v4(),
        title:         'Clean the Trash',
        status:        'Completed',
        department:    'Housekeeping',
        details:       'Including the coffee spilled around it + Take out all the bags to the main trash container.',
        location:      'Second elevator - first floor',
        hasAttachment: false,
        priority:      'Low',
        images:        [testImage],
        createdAt:     Date.now() - time3,
        time:          '00:08:35',
        pickedBy:      'Chen Asulin'
    }
]

export default tasks

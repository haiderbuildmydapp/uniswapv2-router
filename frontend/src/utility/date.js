import {
    addDays,
    isValid,
    formatDistanceToNow,
    differenceInDays,
    fromUnixTime,
    getUnixTime,
} from 'date-fns'
import format from 'date-fns/format'

export const DateFormat = {
    date: 'MM/dd/yyyy',
    dateTime: "MMM dd, yyyy 'at' hh:mm a",
}

export class DateUtility {
    static dateToString(date,formatStr = DateFormat.date) {
        if (!date) return ''
        if (isValid(date)) {
            return format(date,formatStr)
        }
        return ''
    }

    static msToDate(ms) {
        return fromUnixTime(ms)
    }

    static addDay(date,day) {
        return addDays(date,day)
    }

    static diff(date1,date2) {
        return differenceInDays(date2,date1)
    }

    static getDistanceInWord(date) {
        return formatDistanceToNow(new Date(date))
    }

    static getUnixTimeStamp() {
        return getUnixTime(new Date())
    }

    static convertDateToUnix(date) {
        return getUnixTime(new Date(date))
    }

    static convertStringToDateFormat(date,formatStr = DateFormat.dateTime) {
     let unixDate = getUnixTime(new Date(date))
     unixDate += unixDate * 1000
     if (!unixDate) return ''
        if (isValid(unixDate)) {
            return format(unixDate,formatStr)
        }
        return ''
    }

    static convertDateFormat(date,formatStr = DateFormat.dateTime) {
        if (!date) return ''
           if (isValid(date)) {
               return format(date,formatStr)
           }
           return ''
       }
}

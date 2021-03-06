const utils = {

    fdsPromoParser: (desc) => {
        let typed = desc.split(':')
        let tokens = typed[1].split(';')
        
        return {
            promoType: typed[0],
            discountType: tokens[0],
            discountValue: tokens[1]
        }
    },

    fdsCouponParser: (desc) => {
        let typed = desc.split(':')
        let tokens = typed[1].split(';')
        return {
            couponType: typed[0],
            discountType: tokens[0],
            discountValue: tokens[1]
        }
    },

    getPromoDesc: (promoType, discountType, discountValue) => {
        if (promoType == 'Delivery') {
            return "Application-wide free delivery"
        } else {
            return (discountType === 'dollars'? "$": "") + discountValue 
                + (discountType === 'percent'? "%": "") + " off first order"
        }
    },

    getCouponDesc: (couponType, discountType, discountValue) => {
        if (couponType == 'Delivery') {
            return "Free delivery"
        } else {
            return (discountType === 'dollars'? "$": "") + discountValue 
                + (discountType === 'percent'? "%": "") + " discount on order"
        }
    },

    formatMonthString: (monthstring) => {
        const format = "YYYY-MM-DD HH:mm:SS";
        const m = new Date(monthstring)
        const formattedString = [
            m.getFullYear(),
            (m.getMonth()+1).toString().padStart(2, '0'),
            "01"
        ].join('-') + ' 00:00:00';

        return formattedString;
    },

}

module.exports = utils;
import React from 'react'
import { useLocation } from 'react-router'
import getRoot from '../../routing/utils/getRoot'
import BannerMap from './BannerMap'

function Banner() {
    const { pathname } = useLocation()
    let bannerInfo = BannerMap({ rootUrl: getRoot(pathname) })
    if(!bannerInfo) {
        bannerInfo = BannerMap({ rootUrl: '/' })
    }

    return (
        <div className="banner">
            <div className="banner__title">
                <div className="banner__title__text">
                    {bannerInfo.name}
                </div>
            </div>
            
            <div className="banner__img">
                {bannerInfo.img}
            </div>
        </div>
    )
}

export default Banner

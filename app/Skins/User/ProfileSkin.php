<?php
/**
 *  This file is part of the Xpressengine package.
 *
 * PHP version 7
 *
 * @category
 * @package     Xpressengine\
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2015 Copyright (C) NAVER Corp. <http://www.navercorp.com>
 * @license     http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html LGPL-2.1
 * @link        https://xpressengine.io
 */

namespace App\Skins\User;

use Xpressengine\Skin\GenericSkin;

/**
 * @category
 * @package     ${NAMESPACE}
 */
class ProfileSkin extends GenericSkin
{
    protected static $id = 'user/profile/skin/xpressengine@default';

    protected static $componentInfo = [
        'name' => '기본 프로필페이지 스킨',
        'description' => 'Xpressengine의 기본 프로필페이지 스킨입니다'
    ];

    protected static $path = 'user.skins.default.profile';

    protected static $info = [];

    protected static $viewDir = '';

    public function render()
    {
        $this->loadAssets();

        $user = $this->data['user'];

        if ($this->data['grant']['modify']) {
            $this->data['profileImageHtml'] = uio(
                'xpressengine@profileImage',
                [
                    'name' => 'profile_img_file',
                    'image' => $user->getProfileImage(),
                    'width' => 120,
                    'height' => 120
                ]
            );
            // todo: 사용하지 않는것으로 보임 확인 필요
            $this->data['bgImageHtml'] = uio(
                'xpressengine@profileBgImage',
                [
                    'name' => 'bgImgFile',
                    'image' => $user->getProfileImage(),
                    'width' => 2048,
                    'height' => 2048
                ]
            );
        }

        return parent::render();
    }

    private function loadAssets()
    {
        $frontend = app('xe.frontend');

        if ($this->data['grant']['modify']) {
            $frontend->js('assets/core/user/profile.js')->load();
        }

        $frontend->css(
            [
                'assets/core/xe-ui-component/xe-ui-component.css',
                'assets/core/user/profile.css'
            ]
        )->load();
    }

}

<?php
/**
 *  This file is part of the Xpressengine package.
 *
 * PHP version 5
 *
 * @category    User
 * @package     Xpressengine\User
 * @author      XE Team (developers) <developers@xpressengine.com>
 * @copyright   2015 Copyright (C) NAVER <http://www.navercorp.com>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        http://www.xpressengine.com
 */
namespace Xpressengine\User\Repositories;

use Xpressengine\User\EmailInterface;

/**
 * 이 인터페이스는 회원의 이메일정보 저장소가 구현해야 하는 인터페이스이다.
 *
 * @category    User
 * @package     Xpressengine\User
 * @author      XE Team (developers) <developers@xpressengine.com>
 * @copyright   2015 Copyright (C) NAVER <http://www.navercorp.com>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        http://www.xpressengine.com
 */
interface PendingEmailRepositoryInterface extends UserEmailRepositoryInterface
{
    /**
     * 이메일 주소로 이메일 정보를 조회한다.
     *
     * @param string        $address 조회할 이메일 주소
     *
     * @return EmailInterface
     */
    public function findByAddress($address);


    /**
     * 회원 아이디로 이메일을 조회하여 반환한다.
     *
     * @param $userId
     *
     * @return EmailInterface
     */
    public function findByUserId($userId);

    /**
     * 주어진 회원이 소유한 이메일을 삭제한다.
     *
     * @param string $userIds 삭제할 이메일을 소유한 회원의 id
     *
     * @return integer
     */
    public function deleteByUserIds($userIds);
}

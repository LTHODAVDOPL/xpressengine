<?php
/**
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2015 Copyright (C) NAVER Corp. <http://www.navercorp.com>
 * @license     http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html LGPL-2.1
 * @link        https://xpressengine.io
 */

namespace App\Http\Controllers;

use DB;
use Exception;
use XeLang;
use XePresenter;
use XeCategory;
use Xpressengine\Category\Models\Category;
use Xpressengine\Category\Models\CategoryItem;
use Xpressengine\Http\Request;
use Xpressengine\Support\Caster;
use Xpressengine\Support\Exceptions\InvalidArgumentHttpException;

class CategoryController extends Controller
{
    public function show($id)
    {
        $category = XeCategory::cates()->find($id);

        if ($category === null) {
            throw new InvalidArgumentHttpException;
        }

        return XePresenter::make('category.show', compact('category'));
    }

    public function storeItem(Request $request, $id)
    {
        /** @var Category $category */
        $category = XeCategory::cates()->find($id);

        DB::beginTransaction();

        try {
            /** @var CategoryItem $item */
            $item = XeCategory::createItem($category, $request->all());
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
        DB::commit();

        $multiLang = XeLang::getPreprocessorValues($request->all(), session()->get('locale'));
        $item->readableWord = $multiLang['word'];

        return XePresenter::makeApi($item->toArray());
    }

    public function updateItem(Request $request, $id)
    {
        /** @var CategoryItem $item */
        $item = XeCategory::items()->find($request->get('id'));
        if (!$item || $item->category->id !== Caster::cast($id)) {
            throw new InvalidArgumentHttpException;
        }

        XeCategory::updateItem($item, $request->all());

        $multiLang = XeLang::getPreprocessorValues($request->all(), session()->get('locale'));
        $item->readableWord = $multiLang['word'];

        return XePresenter::makeApi($item->toArray());
    }

    /**
     * 카테고리를 삭제
     *
     * @param Request $request request
     * @param integer $id      해당 게시판 id
     * @param bool    $force   하위카테고리 삭제 유무(true=>하위카테고리까지 삭제)
     *
     * @throws Exception
     *
     * @return void
     */
    public function destroyItem(Request $request, $id, $force = false)
    {
        /** @var CategoryItem $item */
        $item = XeCategory::items()->find($request->get('id'));
        if (!$item || $item->category->id !== Caster::cast($id)) {
            throw new InvalidArgumentHttpException;
        }

        DB::beginTransaction();

        try {
            XeCategory::deleteItem($item, $force);
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
        DB::commit();

        return XePresenter::makeApi([]);
    }

    public function moveItem(Request $request, $id)
    {
        /** @var CategoryItem $item */
        $item = XeCategory::items()->find($request->get('id'));
        if (!$item || $item->category->id !== Caster::cast($id)) {
            throw new InvalidArgumentHttpException;
        }

        $parent = XeCategory::items()->find($request->get('parent_id'));

        DB::beginTransaction();

        try {
            $item = XeCategory::moveTo($item, $parent);
            XeCategory::setOrder($item, $request->get('ordering', 0));
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
        DB::commit();
    }

    public function children(Request $request, $id)
    {
        if ($request->get('id') === null) {
            $children = XeCategory::cates()->find($id)->getProgenitors();
        } else {
            /** @var CategoryItem $item */
            $item = XeCategory::items()->find($request->get('id'));
            if (!$item || $item->category->id !== Caster::cast($id)) {
                throw new InvalidArgumentHttpException;
            }

            $children = $item->getChildren();
        }

        foreach ($children as $child) {
            $child->readableWord = xe_trans($child->word);
        }

        return XePresenter::makeApi($children->toArray());
    }
}

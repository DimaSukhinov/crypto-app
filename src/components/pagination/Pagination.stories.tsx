import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Pagination} from './Pagination';

export default {
    title: 'Crypto app/Pagination',
    component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const changeCurrentPage = (page: number) => setCurrentPage(page)

    return <Pagination {...args} currentPage={currentPage} changeCurrentPage={changeCurrentPage}/>
}

export const ControlledPagination = Template.bind({})
ControlledPagination.args = {
    valuesPerPage: 12,
    totalValues: 100,
}

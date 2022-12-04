/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../configs/api";
import Header from "./layout/Header";
import DataTable from 'react-data-table-component';





const MyPost = () => {
    const [post, setPost] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const caseInsensitiveSort = (rowA, rowB) => {
        const a = rowA.title.toLowerCase();
        const b = rowB.title.toLowerCase();

        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1;
        }

        return 0;
    };
    const columns = [
        {
            name: 'Tiêu đề',
            selector: row => row.title,
            sortable: true,
            sortFunction: caseInsensitiveSort
        },
        {
            name: 'Nội dung tin tức',
            selector: row => row.content,
            sortable: true,
            sortFunction: caseInsensitiveSort
        }, {
            name: 'Ngày tạo',
            selector: row => new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.create_at),
            sortable: true,
            sortFunction: caseInsensitiveSort
        },
        {
            name: 'Trạng thái',
            selector: row => row.active === 0 ? 'Chưa duyệt' : 'Đã duyệt',
            sortable: true,
            sortFunction: caseInsensitiveSort
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Hiển thị',
        rangeSeparatorText: 'trong tổng số',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);

        console.log("Selected Rows: ", selectedRows);
        if (selectedRows.length > 0) {
            console.log("Selected Rows: ", selectedRows.at(0).id);

        }


    };

    // Toggle the state so React Data Table changes to clearSelectedRows are triggered
    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    };
    useEffect(() => {

        const loadMyPost = async () => {
            const res = await authApi().get(endpoints['my-post'])
            console.log(res.data)
            setPost(res.data)

        }

        loadMyPost()

    }, [])

    return (

        <>
            <Header />
            {/* style={{ position: 'absolute', top: "25%", left: "5%" }} */}
            <Container >

                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h3 class="page-header-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            Danh sách tin tức
                        </h3>
                    </div>
                    <div class="col-12 col-xl-auto mb-3" style={{ position: 'absolute', top: "15%", right: "20%" }} >
                        <Link class="btn btn-sm btn-light text-primary" to="/post">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus me-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Thêm bài viết mới
                        </Link>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: "30%", left: "8%", width: '85%' }}  >
                    {selectedRows.length > 0 ? <Link to={`/posts/update/${selectedRows.at(0).id}`} ><Button style={{ backgroundColor: '#4CAF50', borderRadius: '10px' }} > Chỉnh Sửa</Button></Link>
                        : <span></span>}
                    {selectedRows.length > 0 ? <Button style={{ backgroundColor: 'red', borderRadius: '10px' }} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Xóa</Button>
                        : <span></span>}
                    <DataTable columns={columns} data={post} selectableRows onSelectedRowsChange={handleChange}
                        clearSelectedRows={toggledClearRows} pagination paginationComponentOptions={paginationComponentOptions} />
                </div>
                {/* <Table bordered hover style={{
                    whiteSpace: 'nowrap',
                }} >
                    <thead>
                        <tr class="text-center"> */}
                {/* <th style={{ textAlign: "center" }}  >sad </th> */}
                {/* <th>Tiêu đề</th>
                            <th >Nội dung</th>
                            <th>Chỉnh sửa nội dung</th>
                            <th>Xóa bài viết</th>
                        </tr>
                    </thead>
                    {
                        post.map(c => {
                            return (
                                <tbody  >
                                    <tr  >
                                        <td >{c.title}</td>
                                        <td style={{ overflow: 'hidden', whiteSpace: 'normal', height: '105px', display: 'inline-block', textOverflow: 'ellipsis' }}   > {c.content}  </td>
                                        <td><Link to={`/posts/update/${c.id}`} ><Button style={{ backgroundColor: '#4CAF50', borderRadius: '10px' }} > Chỉnh Sửa</Button></Link></td>
                                        <td><Button style={{ backgroundColor: 'red', borderRadius: '10px' }} > Xóa</Button></td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </Table> */}
            </Container>

        </>
    )
}
export default MyPost;
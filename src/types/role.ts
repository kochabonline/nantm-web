interface RolePaginationRequest {
    /**
     * 页码
     */
    page: number
    /**
     * 每页数量
     */
    size: number
    /**
     * 关键字
     */
    keyword: string
}

export type {
    RolePaginationRequest
}
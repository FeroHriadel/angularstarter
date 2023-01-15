import { Component, Input, OnInit } from "@angular/core";
import { ItemModel } from "src/app/models/item.model";
import { ItemModelWithTagsAsObjects } from "src/app/models/item.model";


@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss']
})



export class ItemCardComponent implements OnInit {
    //props
    @Input() item: ItemModelWithTagsAsObjects



    constructor() {}

    ngOnInit(): void {}

}

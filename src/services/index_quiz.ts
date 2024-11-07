import chineseNumberToArabic from "../utils/zhToArabic";
import quizModule from "../models/quizModel";
import { promises } from "dns";


interface menu_index {
    [key: string]: Promise<string[]>
}

type subjectListPromise = Promise<string[]>
type indexPromise = Promise<string[][]>

interface treeData{
    node:string,
    children:treeData[] | null
}

export default class quiz{
    quizModule;
    quizIndex:Promise<treeData[]>;
    constructor(){
        this.quizModule = quizModule
        this.quizIndex = this.indexQuiz()
    }

    async indexQuiz(){
        const subjects = await this.getDistinctCls()
        const quizIndex = subjects.map(async cls=>{
            const tree = this.generateTreeData(cls,await this.getUnit(cls))
            // console.log(tree)
            return tree
        })



        console.log("习题索引完成")
        return Promise.all(quizIndex)
    }


    async getDistinctCls():subjectListPromise{
        try {  
            // 查询不同的 cls 值  
            const distinctCls = await quizModule.distinct('cls');  
            return distinctCls.filter((cls): cls is string => cls !== null);  
        } catch (error) {  
            console.error('Error fetching distinct cls:', error);  
            return ['内科学']
        }  
    }

    async getUnit(cls:string):Promise<string[]>{
        try{
            const unit = await quizModule.distinct('unit',{
                cls:cls
            })
            return unit.filter((unit):unit is string => unit !==null)
        }catch(e){
            console.error('Error fetching distinct unit:', e);  
            return ['第三篇 第二章 心力衰竭']
        }
    }

    async generateTreeData(cls:string,unitList:string[]){
        //判断有无分篇目
        const rule = /第.+?篇|[上中下]篇/g
        const pian = unitList.map(node=>{return node.match(rule)})
        // console.log(pian)
        let unique_pian: string[] = []
        let tree: treeData

        if(pian.includes(null)){
            //无篇目
            tree = {
                node:cls,
                children: unitList.map(item=>{return {
                    node:item,
                    children:null
                }})
            }
            
        }else{
            //有篇目
            const filteredPian = pian.filter((res): res is RegExpMatchArray => res !== null); 
            //缩减
            unique_pian = filteredPian.map((res)=>res[0]).filter((value, index,self) => self.indexOf(value) === index)

            //排序
            unique_pian.sort((a, b) => { 
                 
                const numA = chineseNumberToArabic(a.replace(/[篇]/g, '')); // 提取数字部分  
                const numB = chineseNumberToArabic(b.replace(/[篇]/g, '')); // 提取数字部分 
                // console.log(a) 
                return numA - numB; // 按数字大小排序  
            });  
            // console.log(unique_pian)

            tree = {
                node: cls,
                children: unique_pian.map(item=>{ return {
                    node:item,
                    children:[]
                }})
            }

            for(const unit in unitList){
                const result = unitList[unit].match(rule)
                if(result!=null){
                    if(tree.children){
                        for(const child of tree.children){
                            if(result[0]==child.node){
                                child.children?.push({
                                    node:unitList[unit],
                                    children:null
                                })
                            }
                        }
                    }
                }
            }
            
        }
        // if(tree.children){
        //     console.log(tree.children[0])
        // }

        // console.log(cls)
        return tree
    }
    
    async getNestedResults(): Promise<object[]> {  
        const distinctCls: string[] = await getDistinctCls(); // 假设这里将会获取所有科目，返回一个 Array  
        const results: object[] = [];  
    
        for (const cls of distinctCls) {  
            // const quizzes = await quizModule.find({ cls }).select('unit').exec();  
            const units = await quizModule.distinct('unit', { cls: cls });  
            const nestedunits = units.map(uni =>{
               const nested =  {
                    id:uni,
                    title:uni,
                    childern:[]
                }
                return nested
            })
    
            const nestedResult = {  
                id: `${results.length + 1}-${cls}`, // 示例: 序号-深度 (深度使用 cls)  
                title: cls,  
                children: nestedunits,  
            };  
    
            results.push(nestedResult);  
        }  
        return results;  
    }  

    
}







////////

export async function getDistinctCls():Promise<string[]> {  
    try {  
        // 查询不同的 cls 值  
        const distinctCls = await quizModule.distinct('cls');  
        return distinctCls.filter((cls): cls is string => cls !== null);  
    } catch (error) {  
        console.error('Error fetching distinct cls:', error);  
        return ['内科学']
    }  
}  

export async function getNestedResults(): Promise<object[]> {  
    const distinctCls: string[] = await getDistinctCls(); // 假设这里将会获取所有科目，返回一个 Array  
    const results: object[] = [];  

    for (const cls of distinctCls) {  
        // const quizzes = await quizModule.find({ cls }).select('unit').exec();  
        const units = await quizModule.distinct('unit', { cls: cls });  
        const nestedunits = units.map(uni =>{
           const nested =  {
                id:uni,
                title:uni,
                childern:[]
            }
            return nested
        })

        const nestedResult = {  
            id: `${results.length + 1}-${cls}`, // 示例: 序号-深度 (深度使用 cls)  
            title: cls,  
            children: nestedunits,  
        };  

        results.push(nestedResult);  
    }  
    return results;  
}  

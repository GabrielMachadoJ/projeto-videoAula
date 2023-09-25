import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Usuario extends BaseModel {
  public static table: string = 'usuarios';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public email: string;

  @column()
  public idade: number;
}

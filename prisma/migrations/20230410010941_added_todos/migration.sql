-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "auth_id" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "user"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;
